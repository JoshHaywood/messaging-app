import { AnimatePresence, motion } from "framer-motion";

import User from "@/interfaces/user";
import SessionUser from "@/interfaces/sessionUser";
import ShowComponent from "@/interfaces/showComponent";

import Contact from "./Contact";
import Settings from "./settings/Settings";

export default function Profile(props: {
  isMobile: boolean;
  contact: User[];
  sessionUser: SessionUser;
  setSessionUser: React.Dispatch<React.SetStateAction<SessionUser>>;
  showComponent: ShowComponent;
  setShowComponent: React.Dispatch<React.SetStateAction<ShowComponent>>;
}) {
  const {
    isMobile,
    contact,
    sessionUser,
    setSessionUser,
    showComponent,
    setShowComponent,
  } = props;

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
          {showComponent.isAccountSettings ? (
            <Settings
              isMobile={isMobile}
              sessionUser={sessionUser}
              setSessionUser={setSessionUser}
              showComponent={showComponent}
              setShowComponent={setShowComponent}
            />
          ) : (
            <Contact
              isMobile={isMobile}
              sessionUser={sessionUser}
              contact={contact}
              showComponent={showComponent}
              setShowComponent={setShowComponent}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
