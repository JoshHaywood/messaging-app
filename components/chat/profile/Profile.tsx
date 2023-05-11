import { AnimatePresence, motion } from "framer-motion";

import ContactTypes from "@/interfaces/contactTypes";
import SessionUser from "@/interfaces/sessionUserTypes";
import ShowComponentTypes from "@/interfaces/showComponentTypes";

import Contact from "./Contact";
import Settings from "./settings/Settings";

export default function Profile(props: {
  isMobile: boolean;
  contact: ContactTypes[];
  sessionUser: SessionUser;
  setSessionUser: React.Dispatch<React.SetStateAction<SessionUser>>;
  showComponentTypes: ShowComponentTypes;
  setShowComponent: React.Dispatch<React.SetStateAction<ShowComponentTypes>>;
}) {
  const {
    isMobile,
    contact,
    sessionUser,
    setSessionUser,
    showComponentTypes,
    setShowComponent,
  } = props;

  return (
    <AnimatePresence>
      {/* If profile is open show profile component else show nothing */}
      {showComponentTypes.showProfile && (
        <motion.div
          initial={isMobile && { y: "100%" }}
          animate={isMobile && { y: 0 }}
          exit={isMobile ? { position: "absolute", y: "100%" } : {}}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="w-full lg:w-1/4 h-full flex flex-col"
        >
          {/* If the user is viewing their own profile show setting component else show recipient component */}
          {showComponentTypes.isAccountSettings ? (
            <Settings
              isMobile={isMobile}
              sessionUser={sessionUser}
              setSessionUser={setSessionUser}
              showComponentTypes={showComponentTypes}
              setShowComponent={setShowComponent}
            />
          ) : (
            <Contact
              isMobile={isMobile}
              sessionUser={sessionUser}
              contact={contact}
              showComponentTypes={showComponentTypes}
              setShowComponent={setShowComponent}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
