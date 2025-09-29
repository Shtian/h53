"use client";

import { useMutation } from "convex/react";
import { Loader2, Trash2 } from "lucide-react";
import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import { toast } from "sonner";
import { api } from "@/../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { logEvent } from "@/lib/logging";
import type { GuestbookEntry } from "@/lib/types";
import {
  type GuestbookEntryUpdateInput,
  guestbookEntryUpdateSchema,
} from "@/lib/validation";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

type EditMemoryDialogProps = {
  entry: GuestbookEntry;
  children: ReactNode;
};

type EditFormState = {
  title: string;
  description: string;
  file: File | null;
};

export function EditMemoryDialog({ entry, children }: EditMemoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<EditFormState>({
    title: entry.title,
    description: entry.description ?? "",
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteArmed, setDeleteArmed] = useState(false);

  const updateMemory = useMutation(api.guestbook.update);
  const deleteMemory = useMutation(api.guestbook.deleteMemory);
  const generateUploadUrl = useMutation(api.guestbook.generateUploadUrl);

  const fileHint = useMemo(() => {
    if (formState.file) {
      const sizeMb = (formState.file.size / (1024 * 1024)).toFixed(1);
      return `${formState.file.type.replace("image/", "").toUpperCase()} • ${sizeMb} MB`;
    }
    return "Upload a new JPEG or PNG (optional)";
  }, [formState.file]);

  const handleDialogChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setFormState({
        title: entry.title,
        description: entry.description ?? "",
        file: null,
      });
      setIsSubmitting(false);
      setIsDeleting(false);
      setDeleteArmed(false);
    }
  };

  const handleFileChange = (event: FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0] ?? null;

    if (!file) {
      setFormState((prev) => ({ ...prev, file: null }));
      return;
    }

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast.error("Please choose a JPEG or PNG image");
      input.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("Image must be 10 MB or smaller");
      input.value = "";
      return;
    }

    setFormState((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const title = (formData.get("title") as string).trim();
    const description = ((formData.get("description") as string) ?? "").trim();

    const updates: GuestbookEntryUpdateInput = {
      id: entry.id,
    };

    if (title !== entry.title) {
      updates.title = title;
    }
    if (description !== (entry.description ?? "")) {
      updates.description = description.length > 0 ? description : undefined;
    }

    try {
      setIsSubmitting(true);

      if (formState.file) {
        const { uploadUrl } = await generateUploadUrl({});
        const uploadResponse = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": formState.file.type,
          },
          body: formState.file,
        });
        if (!uploadResponse.ok) {
          throw new Error("Opplasting mislykket");
        }
        const payload = (await uploadResponse.json()) as { storageId: string };
        updates.imageStorageId = payload.storageId;
      }

      if (Object.keys(updates).length === 1) {
        toast.info("Ingen endringer å lagre");
        return;
      }

      const validated = guestbookEntryUpdateSchema.parse({
        ...updates,
        imageAltText: title,
      });

      await updateMemory(validated);
      logEvent("guestbook.update.success", {
        entryId: entry.id,
        changedTitle: updates.title !== undefined,
        changedDescription: updates.description !== undefined,
        replacedPhoto: updates.imageStorageId !== undefined,
      });
      toast.success("Bildepost oppdatert");
      handleDialogChange(false);
    } catch (error) {
      console.error(error);
      logEvent("guestbook.update.failure", {
        entryId: entry.id,
        message: error instanceof Error ? error.message : String(error),
      });
      toast.error("Kunne ikke oppdatere bildepost");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;

    if (!deleteArmed) {
      setDeleteArmed(true);
      return;
    }

    try {
      setIsDeleting(true);
      await deleteMemory({ id: entry.id });
      logEvent("guestbook.delete.success", { entryId: entry.id });
      toast.success("Memory deleted");
      handleDialogChange(false);
    } catch (error) {
      console.error(error);
      logEvent("guestbook.delete.failure", {
        entryId: entry.id,
        message: error instanceof Error ? error.message : String(error),
      });
      toast.error("Unable to delete this memory");
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rediger bilde</DialogTitle>
          <DialogDescription>
            Oppdater tittel, beskrivelse eller bildet.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="edit-photo">
              Bilde
            </label>
            <input
              id="edit-photo"
              name="photo"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="block w-full cursor-pointer rounded-md border border-slate-300/80 px-4 py-2 text-sm  file:mr-4 file:rounded-md file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
            />
            <p className="text-xs text-muted-foreground">{fileHint}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium " htmlFor="edit-title">
              Tittel
            </label>
            <input
              id="edit-title"
              name="title"
              required
              minLength={3}
              maxLength={120}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400/40"
              value={formState.title}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  title: event.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium " htmlFor="edit-description">
              Beskrivelse{" "}
              <span className="text-muted-foreground">(valgfritt)</span>
            </label>
            <textarea
              id="edit-description"
              name="description"
              maxLength={1000}
              rows={4}
              className="w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400/40"
              value={formState.description}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
            />
          </div>

          <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant={deleteArmed ? "destructive" : "ghost"}
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Sletter…
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    {deleteArmed ? "Bekreft sletting" : "Slett"}
                  </>
                )}
              </Button>
              {deleteArmed ? (
                <p className="text-xs text-muted">
                  Klikk bekreft for å permanent slette dette innlegget.
                </p>
              ) : null}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleDialogChange(false)}
                disabled={isSubmitting || isDeleting}
              >
                Avbryt
              </Button>
              <Button type="submit" disabled={isSubmitting || isDeleting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Lagrer
                  </>
                ) : (
                  "Lagre endringer"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
