import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function WindowWarning({ hasUnsavedChanges, children }) {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges()) {
        const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
        e.returnValue = confirmationMessage; // Standard for most browsers
      }
    };
    // Adding the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);
    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return <>{children}</>;
}

WindowWarning.propTypes = {
  hasUnsavedChanges: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
