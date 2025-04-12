import { User } from "@/db/schema";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Label,
} from "@/shared/ui";
import { useForm } from "react-hook-form";
import { UserProfileFormData, userSchema } from "@/pages/cabinet/models/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useState } from "react";
import { changeInfo } from "@/pages/cabinet/api/changeInfo";
import ChangeAlert from "@/pages/cabinet/ui/changeAlert";

export default function ChangeUserInfoForm({ user }: { user: User }) {
    const [isEditing, setIsEditing] = useState(false);
    const {
        register,
        formState: { errors },
    } = useForm<UserProfileFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            firstName: user.name,
            lastName: "" || user.lastName,
            email: "" || user.email,
            phone: "" || user.phone,
        },
    });
    const [message, formChangeAction] = useActionState(changeInfo, null);
    const [isChangeDialogOpen, setIsChangeDialogOpen] = useState(false);
    return (
        <>
            <ChangeAlert open={isChangeDialogOpen} message={message} />
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Персональная информация</CardTitle>
                    <Button
                        variant="outline"
                        className="bg mt-4 bg-[#FFB800] text-lg hover:bg-[#E5A600]"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        Изменить
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form action={formChangeAction}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Имя</Label>
                                <Input
                                    id="firstName"
                                    readOnly={!isEditing}
                                    defaultValue={user.name}
                                    {...register("firstName")}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Фамилия</Label>
                                <Input
                                    id="lastName"
                                    readOnly={!isEditing}
                                    defaultValue={user.lastName}
                                    {...register("lastName")}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Электронная почта</Label>
                                <Input
                                    id="email"
                                    readOnly={!isEditing}
                                    defaultValue={user.email}
                                    type="email"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Номер телефона</Label>
                                <Input
                                    id="phone"
                                    readOnly={!isEditing}
                                    defaultValue={user.phone}
                                    type="tel"
                                    {...register("phone")}
                                />
                                {errors.phone && (
                                    <p className="text-red-500">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            {isEditing && (
                                <div className="flex justify-end space-x-2 pt-4">
                                    <Button type="button" variant="outline">
                                        Закрыть
                                    </Button>
                                    <Button
                                        type="submit"
                                        onClick={() =>
                                            setIsChangeDialogOpen(true)
                                        }
                                        className="bg-[#FFB800] text-black hover:bg-[#E5A600]"
                                    >
                                        Сохранить изменения
                                    </Button>
                                </div>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
