//
// Chat Window
//
// import { WidgetBase } from "../../../widgets/base";


// export class Chat extends WidgetBase<HTMLDivElement>
// {
//     private messages: HTMLParagraphElement[];

//     constructor(parent: HTMLDivElement)
//     {
//         super(parent, document.createElement("div"));

//         this.messages = [];

//         this.setup_dom();
//         // this.setup_wiring();
//     }

//     private setup_dom()
//     {
//         this.container.id = "chat";
//     }

//     private display_msg(msg: string, owner: string)
//     {
//         let message = document.createElement("p");

//         message.innerHTML = msg;

//         switch (owner) {
//             case "Me":
//                 message.className = "msg right";
//                 break;
//             case "Other":
//                 message.className = "msg left";
//         }

//         this.messages.push(message);
//         this.container.appendChild(message);

//         let rect = message.getBoundingClientRect();
//         this.container.scrollBy(0, rect.height);
//     }

//     // private setup_wiring()
//     // {
//     //     sl.events.on(Event.CHAT_SHOW, (btn: ChatButton) => {
//     //         this.container.style.right = "0px";
//     //     });

//     //     sl.events.on(Event.CHAT_HIDE, (btn: ChatButton) => {
//     //         this.container.style.right = "-250px";
//     //     });

//     //     sl.events.on(Event.MSG_SENT, (msg: string) => {
//     //         this.display_msg(msg, "Me");
//     //     });
//     // }
// }
