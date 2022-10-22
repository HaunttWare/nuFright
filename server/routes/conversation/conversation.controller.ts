// import { db } from "../../prisma/utils/db.server";
// import { Request, Response } from "express";

// //Get conversation of a user
// export const getConversation = async (req: Request, res: Response) => {
//   const { userId } = req.params;
//   try {
//     const conversation = await db.conversation.findMany({
//       where: {
//         users: {
//           some: {
//             id: userId,
//           },
//         },
//       },
//       include: {
//         users: true,
//         messages: true,
//       },
//     });
//     res.status(200).json(conversation);
//   } catch (error) {
//     console.log(error);
//   }
// };

// // find or create conversation
// export const findOrCreateConversation = async (req: Request, res: Response) => {
//   const { firstUserId, secondUserId } = req.params;
//   try {
//     const conversation = await db.conversation.findMany({
//       where: {
//         users: {
//           every: {
//             id: {
//               in: [firstUserId, secondUserId],
//             },
//           },
//         },
//       },
//       include: {
//         users: true,
//         messages: true,
//       },
//     });
//     if (conversation.length === 0) {
//       const newConversation = await db.conversation.create({
//         data: {
//           users: {
//             connect: [{ id: firstUserId }, { id: secondUserId }],
//           },
//         },
//         include: {
//           users: true,
//           messages: true,
//         },
//       });
//       res.status(200).json(newConversation);
//     } else {
//       res.status(200).json(conversation[0]);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
