"use client";

import styles from "./CardBack.module.css";

export default function CardBack() {
    return (
        <div className={styles.card}>
            {/* Geometric patterns */}
            <div className={styles.patterns}>
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.geoShape}
                        style={{
                            width: `${40 + i * 25}px`,
                            height: `${40 + i * 25}px`,
                            top: `${10 + i * 12}%`,
                            left: `${5 + i * 15}%`,
                            animationDelay: `${i * 0.5}s`,
                            opacity: 0.04 + i * 0.01,
                        }}
                    />
                ))}
            </div>

            {/* Content — no bottom Bt. */}
            <div className={styles.content}>
                {/* Bt. branding — top left only */}
                <div className={styles.branding}>Bt.</div>

                <div className={styles.profileSection}>
                    <div className={styles.avatarWrapper}>
                        <img
                            src="/images/profilepic2.png"
                            alt="Bhanu Teja"
                            className={styles.avatar}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect fill='%23111' width='120' height='120' rx='60'/%3E%3Ctext x='50%25' y='55%25' text-anchor='middle' fill='%233b82f6' font-family='monospace' font-size='36' dy='.1em'%3EBT%3C/text%3E%3C/svg%3E";
                            }}
                        />
                        <div className={styles.avatarGlow} />
                    </div>

                    <h2 className={styles.name}>Bhanu Teja</h2>
                    <h2 className={styles.name}>Gummadavelli</h2>
                </div>
            </div>
        </div>
    );
}
