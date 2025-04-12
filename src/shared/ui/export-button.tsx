"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { Product } from "@/db/schema";

export default function ExportButton({ response }: {responce:Product}) {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        try {
            const xlsx = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
            });
            const blob = await xlsx.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "products.xlsx";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Ошибка экспортирования продуктов:", error);
            alert("Ошибка экспортирования продуктов. Повторите попытку.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <Button
            onClick={handleExport}
            variant={"outline"}
            className="border-none bg-green-600 text-white hover:bg-green-700"
            title="Экспортировать продуктов"
            disabled={isExporting}
        >
            {isExporting ? "Экспорт..." : <FileSpreadsheet />}
        </Button>
    );
}
