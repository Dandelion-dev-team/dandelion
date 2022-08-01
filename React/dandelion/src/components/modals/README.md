# Modals

Initially, modals were created from scratch in an inconsistent way.
The correct way to implement them is to use the react-bootstrap API which manages all
the basic features of a modal including the internal structure, postioning of content,
close button, etc.

This approach should eventually be rolled out to all the modals; however, for tyhe time
being it has only been used for those that required updating. The list below shows which
ones use bootstrap and which ones don't. As further changes are made, the remaining
modals should be migrated to bootstrap:

| Modal                      | Bootstrap |
|----------------------------|-----------|
| activityCreatedModal.js    | N         |
| addMultipleUsersModal.js   | N         |
| addNoteModal.js            | N         |
| addStudentModal.js         | N         |
| addUserTypeModal.js        | N         |
| continuousVariableModal.js | N         |
| discreteVariableModal.js   | N         |
| editActivityModal.js       | N         |
| editUserModal.js           | N         |
| enterObservationModal.js   | N         |
| inviteModal.js             | N         |
| inviteSchoolModal.js       | N         |
| mapDetailModal.js          | N         |
| noNodeModal.js             | N         |
| observationsHelpModal.js   | N         |
| passwordResetModal.js      | N         |
| registerNodeModal.js       | N         |
| selectAddTypeModal.js      | N         |
| unitHelpModal.js           | N         |
| variableTypeModal.js       | N         |
| viewDetailedVariable.js    | N         |
