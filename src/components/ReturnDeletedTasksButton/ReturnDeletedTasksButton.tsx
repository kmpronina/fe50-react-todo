// import React, { ReactNode, useContext } from 'react';
// import { TasksContext } from '../../store/context.ts';
// // import { Task } from '../../models/Task.ts';
// import { ReturnDeletedTasksButtonStyled } from './ReturnDeletedTasksButtonStyled.ts';

// interface Props {
//   onClick: () => void;
//   disable: boolean;
//   children: ReactNode;
// }

// export const ReturnDeletedTasksButton: React.FC<Props> = (props) => {
//   const { children, disable, onClick } = props;
//   const { deletedTasks } = useContext(TasksContext);

//   return (
//     <ReturnDeletedTasksButtonStyled
//       onClick={onClick}
//       disable={!deletedTasks.length ? false : true}
//     >
//       {children}
//     </ReturnDeletedTasksButtonStyled>
//   );
// };
