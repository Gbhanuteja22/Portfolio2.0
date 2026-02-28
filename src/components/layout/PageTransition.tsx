"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
    children: React.ReactNode;
}

const pageVariants = {
    initial: {
        opacity: 0,
        y: 24,
        filter: "blur(6px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
    exit: {
        opacity: 0,
        y: -16,
        filter: "blur(4px)",
        transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
};

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.main
                key={pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="min-h-screen"
            >
                {children}
            </motion.main>
        </AnimatePresence>
    );
}
