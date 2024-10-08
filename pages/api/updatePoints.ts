import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase/clientApp";
import type { NextApiRequest, NextApiResponse } from 'next'
import Account, { accountConverter } from "@/types/Account";
import Neighborhood, { neighborhoodConverter } from "@/types/Neighborhood";
import Item, { itemConverter } from "@/types/Item";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("received updatsPoints request");
    const data = req.body;
    const itemId = data.itemId;
    const points = data.points;
    const userId = data.userId;
    if (userId) {
        // mark item as claimed
        let itemDocRef = doc(db, "items", itemId).withConverter(itemConverter);
        // check if item is claimed
        // if so, then do nothing
        let checkClaimed = await getDoc(itemDocRef);
        if (checkClaimed.exists()) {
            let item = checkClaimed.data() as Item;
            if (item.claimed) {
                return;
            }
        }
        await updateDoc(itemDocRef, {
            "claimed": true
        })
        // get user id of whoever posted
        let itemSnap = await getDoc(itemDocRef);
        let userIdReceived = "";
        if (itemSnap.exists()) {
            let item = itemSnap.data() as Item;
            userIdReceived = item.account;
        }

        // update points in user
        let docRef = doc(db, "users", userId).withConverter(accountConverter);
        let userSnap = await getDoc(docRef);
        let addedPoints = 0;
        if (userSnap.exists()) {
            let user = userSnap.data() as Account;
            addedPoints = user.points;
        }
        addedPoints += points;
        await updateDoc(docRef, {
            "points": addedPoints
        });

        // update points in user bought
        docRef = doc(db, "users", userIdReceived).withConverter(accountConverter);
        let userReceivedSnap = await getDoc(docRef);
        addedPoints = 0;
        if (userSnap.exists()) {
            let user = userReceivedSnap.data() as Account;
            addedPoints = user.points;
        }
        addedPoints += points;
        await updateDoc(docRef, {
            "points": addedPoints
        });

        // update points in neighborhood
        userSnap = await getDoc(doc(db, "users", userId).withConverter(accountConverter));
        if (userSnap.exists()) {
            let user = userSnap.data() as Account;
            let docRef = doc(db, "neighborhoods", user.neighborhood).withConverter(neighborhoodConverter);
            let neighborhoodSnap = await getDoc(docRef);
            addedPoints = 0;
            if (neighborhoodSnap.exists()) {
                let neighborhood = neighborhoodSnap.data() as Neighborhood;
                addedPoints = neighborhood.points;
            }
            addedPoints += (points * 2);
            await updateDoc(docRef, {
                "points": addedPoints
            });
        }

        res.status(200).end();
    } else {
        res.status(500).end();
    }

}

// /**
//   Updates a specific property of a Firestore document identified by its ID.
//   
//   @param collectionName - The name of the collection where the document is stored
//   @param documentId - The ID of the document to be updated
//   @param property - The property to be updated
//   @param value - The new value for the property
//   @returns A promise that resolves to a message indicating success or failure
//  /
// export async function updateDocumentProperty(
//     collectionName: string,
//     documentId: string,
//     property: string,
//     value: any
// ): Promise<string> {
//     const docRef = doc(db, collectionName, documentId);

//     try {
//         await updateDoc(docRef, {
//             [property]: value
//         });
//         return `Document ${documentId} updated successfully.`;
//     } catch (error: any) {
//         console.error("Error updating document: ", error);
//         throw new Error(`Failed to update document ${documentId}: ${error.message}`);
//     }
// }