import Stripe from 'stripe';
<<<<<<< HEAD
import * as packageInfo from '../../package.json';
=======
import { version }  from '../../package.json';
>>>>>>> e218f72ffa34985af87100f497ef1633d431b98e

export const stripe = new Stripe(
    process.env.STRIPE_API_KEY,
    {
     apiVersion:'2020-08-27',
     appInfo: {
        name: 'ignews',
<<<<<<< HEAD
        version: packageInfo.version
=======
        version: version
>>>>>>> e218f72ffa34985af87100f497ef1633d431b98e
     },
    }
)

<<<<<<< HEAD
// import { version } from '../../pakage.json';
// import { version }  from '../../package.json';
=======
// import { version } from '../../pakage.json';
>>>>>>> e218f72ffa34985af87100f497ef1633d431b98e
