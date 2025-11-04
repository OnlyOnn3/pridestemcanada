"use client";
import { motion } from "framer-motion";
import RegistrationForm from "../RegistrationForm";
import styles from "../../page.module.css";

export default function FormSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={styles.formSection}
        >
            <div className={styles.formContainer}>
                <RegistrationForm />
            </div>
        </motion.div>
    );
}