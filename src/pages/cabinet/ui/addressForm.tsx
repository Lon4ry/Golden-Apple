import {
    Alert,
    AlertDescription,
    AlertTitle,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
    Label,
} from "@/shared/ui";
import { AlertCircle, MapPin, Settings } from "lucide-react";
import { updateAddress } from "@/pages/cabinet/api/changeAddress";
import { useState } from "react";
import { User } from "@/db/schema";
import ChangeAlert from "@/pages/cabinet/ui/changeAlert";

export default function AddressForm({ user }: { user: User }) {
    const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
    const [isChangeDialogOpen, setIsChangeDialogOpen] = useState(false);
    const [address, setAddress] = useState(user.address);
    return (
        <>
            <ChangeAlert open={isChangeDialogOpen} />
            <Card>
                <CardHeader>
                    <CardTitle>Адресы</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                        {user?.address ? (
                            <>
                                <Card>
                                    <CardContent className="flex justify-between pt-6">
                                        <p className="mt-2 text-sm">
                                            {user?.address.slice(0, 20)}
                                            ...
                                        </p>
                                        <div className="mb-2 flex items-start justify-between">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setIsAddressDialogOpen(
                                                        true,
                                                    );
                                                    console.log(
                                                        isAddressDialogOpen,
                                                    );
                                                }}
                                            >
                                                <Settings className="h-6 w-6" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Пусто!</AlertTitle>
                                <AlertDescription>
                                    Вы не добавили не одного адресса
                                </AlertDescription>
                            </Alert>
                        )}
                        {!user?.address ? (
                            <Button
                                variant="outline"
                                className="flex h-full min-h-[120px] flex-col gap-2"
                                onClick={() => setIsAddressDialogOpen(true)}
                            >
                                <MapPin className="h-8 w-8" />
                                Добавить новый адрес
                            </Button>
                        ) : (
                            ""
                        )}
                    </div>
                    <Dialog
                        open={isAddressDialogOpen}
                        onOpenChange={setIsAddressDialogOpen}
                    >
                        <DialogTrigger asChild></DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">
                                    Добавить адрес получателя
                                </DialogTitle>
                                <DialogDescription className="text-lg">
                                    Добавьте адрес чтобы оформить заказ
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="address">
                                        Введите ваш адрес
                                    </Label>
                                    <Input
                                        id="address"
                                        required
                                        defaultValue={
                                            user.address ? user.address : ""
                                        }
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2 pt-4">
                                <Button
                                    type="submit"
                                    onClick={() => {
                                        if (address.length > 5) {
                                            updateAddress(user.id, address);
                                            setIsAddressDialogOpen(false);
                                            setIsChangeDialogOpen(true);
                                        }
                                    }}
                                    className="bg-[#FFB800] text-black hover:bg-[#E5A600]"
                                >
                                    Применить изменения
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </>
    );
}
