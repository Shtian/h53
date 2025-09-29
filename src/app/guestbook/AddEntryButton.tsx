"use client";

import { useMutation } from "convex/react";
import { Loader2, Plus } from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";
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
import { guestbookEntryCreateSchema } from "@/lib/validation";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

type FormState = {
  title: string;
  description: string;
  file: File | null;
};

export function AddEntryButton() {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    title: "",
    description: "",
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateUploadUrl = useMutation(api.guestbook.generateUploadUrl);
  const createMemory = useMutation(api.guestbook.create);

  const fileHint = useMemo(() => {
    if (!formState.file) {
      return "JPEG eller PNG, opp til 10 MB";
    }

    const sizeMb = (formState.file.size / (1024 * 1024)).toFixed(1);
    return `${formState.file.type.replace("image/", "").toUpperCase()} • ${sizeMb} MB`;
  }, [formState.file]);

  const resetForm = () => {
    setFormState({ title: "", description: "", file: null });
    setIsSubmitting(false);
  };

  const handleDialogChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetForm();
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
      toast.error("Vennligst velg et JPG eller PNG bilde");
      input.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("Bildet må være 10 MB eller mindre");
      input.value = "";
      return;
    }

    setFormState((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!formState.file) {
      toast.error("Add a photo to share your memory");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const title = (formData.get("title") as string).trim();
    const description = ((formData.get("description") as string) ?? "").trim();

    try {
      setIsSubmitting(true);
      const { uploadUrl } = await generateUploadUrl({});

      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": formState.file.type,
        },
        body: formState.file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }

      const { storageId } = (await uploadResponse.json()) as {
        storageId: string;
      };

      const validated = guestbookEntryCreateSchema.parse({
        title,
        description: description.length > 0 ? description : undefined,
        imageStorageId: storageId,
        imageAltText: title,
      });

      const entryId = await createMemory(validated);

      logEvent("guestbook.create.success", {
        entryId,
        title,
        hasDescription: Boolean(validated.description),
      });

      toast.success("Bilde lagt til!");
      handleDialogChange(false);
    } catch (error) {
      console.error(error);
      logEvent("guestbook.create.failure", {
        message: error instanceof Error ? error.message : String(error),
      });
      toast.error("Noe gikk galt under opplasting av bildet");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="self-start">
          <Plus className="size-4" />
          Legg til
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Legg til nytt bilde</DialogTitle>
          <DialogDescription>
            Last opp et bilde, gi det en tittel og beskriv øyeblikket om du vil.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="photo"
              className="text-sm font-medium"
            >
              Bilde
            </label>
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/jpeg,image/png"
              required
              onChange={handleFileChange}
              className="block w-full cursor-pointer rounded-md border border-slate-300/80 px-4 py-2 text-sm  file:mr-4 file:rounded-md file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
            />
            <p className="text-xs text-muted-foreground">{fileHint}</p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium "
            >
              Tittel
            </label>
            <input
              id="title"
              name="title"
              required
              minLength={3}
              maxLength={120}
              placeholder="A few words about the memory"
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
            <label
              htmlFor="description"
              className="text-sm font-medium"
            >
              Beskrivelse <span className="text-muted-foreground">(valgfritt)</span>
            </label>
            <textarea
              id="description"
              name="description"
              maxLength={1000}
              rows={4}
              placeholder="Share the story behind this moment"
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

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleDialogChange(false)}
              disabled={isSubmitting}
            >
              Avbryt
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Lagrer
                </>
              ) : (
                "Lagre bilde"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
