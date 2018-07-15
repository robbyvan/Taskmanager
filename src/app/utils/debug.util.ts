import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/do';

// Observable.prototype.userDefined = () => {
//   return new Observable((subscriber) => {
//     this.subscribe({
//       next(value) { subscriber.next(value); },
//       error(err) { subscriber.error(err); },
//       complete() { subscriber.complete(); },
//    });
//   });
// }

// Observable.prototype.debug = function(message: string) {
//   return this.do(
//     (nextValue) => {
//        if (!environment.production) {
//          console.log(message, nextValue);
//        }
//     },
//     (err) => {
//       if (!environment.production) {
//         console.log('ERROR >> ', message, err);
//       }
//     },
//     () => {
//       if (!environment.production) {
//         console.log("completed - ", message);
//       }      
//     }
//   );
// }
