import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { LoginForm, RegistrationForm } from "@/widgets/header/ui/";

export function AuthTabs() {
    return (
        <Tabs defaultValue="account" className="">
            <TabsList className="grid w-full grid-cols-2 rounded-none">
                <TabsTrigger className="text-lg" value="login">
                    Войти
                </TabsTrigger>
                <TabsTrigger className="text-lg" value="register">
                    Зарегистрироваться
                </TabsTrigger>
            </TabsList>
            <TabsContent className="duration-700" value="login">
                <LoginForm />
            </TabsContent>
            <TabsContent value="register">
                <RegistrationForm />
            </TabsContent>
        </Tabs>
    );
}
