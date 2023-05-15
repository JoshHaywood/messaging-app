import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ChatContext from "../ChatContext";

import Contact from "./Contact";
import Settings from "./settings/Settings";

export default function Profile() {
  const { isMobile, showComponent } = useContext(ChatContext);

  return (
    <AnimatePresence>
      {/* If profile is open show profile component else show nothing */}
      {showComponent.showProfile && (
        <motion.div
          initial={isMobile && { y: "100%" }}
          animate={isMobile && { y: 0 }}
          exit={isMobile ? { position: "absolute", y: "100%" } : {}}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="w-full lg:w-1/4 h-full flex flex-col"
        >
          {/* If the user is viewing their own profile show setting component else show recipient component */}
          {showComponent.isAccountSettings ? <Settings /> : <Contact />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
