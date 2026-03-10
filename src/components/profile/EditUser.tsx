"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { EditUserInput, editUserSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { editUserAction } from "@/lib/actions/user";
import { useTranslations } from "next-intl";

const EditUser = ({
  currentUser,
}: {
  currentUser: { name: string; email: string };
}) => {
  const tError = useTranslations("errors");
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<EditUserInput>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
  });

  const onSubmit: SubmitHandler<EditUserInput> = async (formData) => {
    clearErrors("root");
    const res = await editUserAction(currentUser, formData);
    if (!res.ok) {
      setError("root", {
        message:
          tError(`codes.${res.code}`) || "An error occurred. Please try again.",
      });
      return;
    }
  };

  return (
    <SheetContent className="p-4">
      <SheetHeader>
        <SheetTitle>Edit Profile</SheetTitle>
      </SheetHeader>
      <SheetDescription>
        This is the edit profile form. You can edit your name and email here.
      </SheetDescription>
      <form
        className="flex flex-col items-center gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 w-full">
          <label className="input-label">Name</label>
          <input className="input-primary" {...register("name")} />
          {errors.name && (
            <p className="text-destructive mt-1">
              {tError(`zod-errors.${errors.name.message}`) ||
                errors.name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="input-label">Email</label>
          <input className="input-primary" {...register("email")} />
          {errors.email && (
            <p className="text-destructive mt-1">
              {tError(`zod-errors.${errors.email.message}`) ||
                errors.email.message}
            </p>
          )}
        </div>
        {errors.root && (
          <p className="text-destructive mt-2">{errors.root.message}</p>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
          Save Changes
        </Button>
      </form>
    </SheetContent>
  );
};

export default EditUser;
