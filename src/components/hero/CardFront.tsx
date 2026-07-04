"use client";

import styles from "./CardFront.module.css";

export default function CardFront() {
    return (
        <div className={styles.card}>
            <div className={styles.scanlines} />

            {/* Bt. branding — top left */}
            <div className={styles.branding}>Bt.</div>

            {/* Profile section */}
            <div className={styles.profileSection}>
                <div className={styles.avatarWrapper}>
                    <div className={styles.avatarRing} />
                    <img
                        src="/images/profilepic.png"
                        alt="Bhanu Teja"
                        className={styles.avatar}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect fill='%23111' width='120' height='120' rx='60'/%3E%3Ctext x='50%25' y='55%25' text-anchor='middle' fill='%233b82f6' font-family='monospace' font-size='36' dy='.1em'%3EBT%3C/text%3E%3C/svg%3E";
                        }}
                    />
                </div>
                <div className={styles.info}>
                    <h2 className={styles.name}>Bhanu Teja</h2>
                    <h2 className={styles.name}>Gummadavelli</h2>
                </div>
            </div>

            <div className={styles.holographic} />
        </div>
    );
}
