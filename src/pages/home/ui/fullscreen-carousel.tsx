import {
    Button,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shared/ui";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

export default function FullscreenCarousel() {
    const [isLeftHovered, setIsLeftHovered] = useState(false);
    const [isRightHovered, setIsRightHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: null, y: null });
    const updateMousePosition = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };
    useEffect(() => {
        const carouselFollow = document.querySelector("#carousel-follow");
        if (carouselFollow) {
            carouselFollow.addEventListener("mousemove", updateMousePosition);

            return () =>
                carouselFollow.removeEventListener(
                    "mousemove",
                    updateMousePosition,
                );
        }
    }, []);
    return (
        <Carousel
            id="carousel-follow"
            plugins={[
                Autoplay({
                    delay: 2000,
                    stopOnMouseEnter: true,
                }),
            ]}
            opts={{ loop: true }}
            className="relative mx-auto w-full cursor-default"
        >
            <CarouselContent>
                <CarouselItem className="relative">
                    <img
                        src="https://pcdn.goldapple.ru/p/mpb/363762636135306561353539633866663134393666626265/web/5f6d61696e5061676542616e6e65728dd54f460a5a6fdfullhd.webp"
                        className="h-[75vh] w-full object-cover"
                        alt=""
                    />
                    <div className="p-1">
                        <div className="bg-opacity-50 absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                            <h2 className="mb-2 text-2xl font-bold md:text-4xl">
                                У нас новые товары!
                            </h2>
                            <p className="mb-4 text-sm md:text-lg">
                                Новые товары уже доступны в каталоге
                            </p>
                            <Button asChild className="">
                                <Link href="/products">Смотреть продукты</Link>
                            </Button>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem className="relative">
                    <img
                        src="https://pcdn.goldapple.ru/p/mpb/363765616337613136313338386561656632346239373038/web/5f6d61696e5061676542616e6e65728dd707406df8ad7fullhd.webp"
                        className="h-[75vh] w-full object-cover"
                        alt=""
                    />
                    <div className="p-1">
                        <div className="bg-opacity-50 absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-black">
                            <h2 className="mb-2 text-2xl font-bold md:text-4xl">
                                Скоро скидки!
                            </h2>
                            <p className="mb-4 text-sm md:text-lg">
                                Скоро весенние скидки
                            </p>
                            <Button asChild className="">
                                <Link href="/products">Смотреть продукты</Link>
                            </Button>
                        </div>
                    </div>
                </CarouselItem>
            </CarouselContent>

            <motion.div
                className="h-13 w-14"
                style={{
                    maskImage: isLeftHovered
                        ? "url('./arrow-left.svg')"
                        : isRightHovered
                          ? "url('./arrow-right.svg')"
                          : "",
                    maskRepeat: "no-repeat",
                    maskSize: "40px",
                    background: "#fff",
                    visibility:
                        isLeftHovered || isRightHovered ? "visible" : "hidden",
                    position: "absolute",
                }}
                animate={{
                    WebkitMaskSize: `${40}px`,
                    top: `${mousePosition.y - 40 / 2}px`,
                    left: `${mousePosition.x - 40 / 2}px`,
                }}
                transition={{
                    type: "tween",
                    ease: "backOut",
                    duration: 0.5,
                }}
            ></motion.div>
            <CarouselPrevious
                onMouseEnter={() => setIsLeftHovered(true)}
                onMouseLeave={() => setIsLeftHovered(false)}
                customButton={true}
                className="absolute left-0 h-full w-4/12 cursor-none rounded-none border-0 bg-transparent hover:bg-transparent"
            />

            <CarouselNext
                onMouseEnter={() => setIsRightHovered(true)}
                onMouseLeave={() => setIsRightHovered(false)}
                customButton={true}
                className="absolute right-0 h-full w-4/12 cursor-none rounded-none border-0 bg-transparent hover:bg-transparent"
            />
        </Carousel>
    );
}
