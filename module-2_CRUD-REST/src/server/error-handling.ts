
import { NextFunction, Response, Request } from 'express';
import { ValidationError } from '@hapi/joi';

export const errorHandlerMiddleware = (err: any | ValidationError, req: Request, res: Response, next: NextFunction) => {

    // if (err.type) {
    //     const e: ExpressJoiError = err
    //     // e.g "you submitted a bad query paramater"
    //     res.status(400).end(`You submitted a bad ${e.type} paramater`)
    //   } else {
    //     res.status(500).end('internal server error')
    //   }

    if (err.name === 'ValidationError') {
        console.log(err.details)
    } else {
        console.log(err.name)
    }

    switch(err.name) {
        case 'ValidationError': {

        };
        default: {
            console.error(err);
            res.status(500).json({ Error: err.message });
        }
    }


};




// function() {
//     console.error(err);
//     res.status(500).send('Something broke!');
// }




// app.use((err: any|ExpressJoiError, req: express.Request, res: express.Response, next: express.NextFunction) => {

//     if (err && err.type in ContainerTypes) {
//         const e: ExpressJoiError = err
//         // e.g "you submitted a bad query paramater"
//         res.status(400).end(`You submitted a bad ${e.type} paramater`)
//       } else {
//         res.status(500).end('internal server error')
//       }

//     console.error(err);
//     res.json({ message: err.message });
// });


