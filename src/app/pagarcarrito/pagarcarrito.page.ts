import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApplePayEventsEnum, GooglePayEventsEnum, PaymentFlowEventsEnum, PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { first, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagarcarrito',
  templateUrl: './pagarcarrito.page.html',
  styleUrls: ['./pagarcarrito.page.scss'],
})
export class PagarcarritoPage implements OnInit {
  data: any = {
    name: 'Jafet Esau',
    email: 'jeckooficial@gmail.com',
    amount: 10000,
    currency: 'mxn'
  };  
  constructor(private http:HttpClient) {
    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    });
   }

  ngOnInit() {
  }

  httpPost(body) {
    return this.http.post<any>(environment.api + 'payment-sheet', body).pipe(first());
  }

  async paymentSheet() {
   
    try {
      // be able to get event of PaymentSheet
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });
    

      const data$ = this.httpPost(this.data);

      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);

      console.log('paymentIntent: ', paymentIntent);

      // prepare PaymentSheet with CreatePaymentSheetOption.
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'Esau'
      });

      console.log('createPaymentSheet');
      // present PaymentSheet and get result.
      const result = await Stripe.presentPaymentSheet();
      console.log('result: ', result);
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Happy path
        this.splitAndJoin(paymentIntent);
      }
    } catch(e) {
      console.log(e);
    }
  }

  async paymentFlow() {
   // be able to get event of PaymentFlow
    Stripe.addListener(PaymentFlowEventsEnum.Completed, () => {
      console.log('PaymentFlowEventsEnum.Completed');
    });

    const data$ = this.httpPost(this.data);

    const {paymentIntent, ephemeralKey, customer} = await lastValueFrom(data$);

    // Prepare PaymentFlow with CreatePaymentFlowOption.
    await Stripe.createPaymentFlow({
      paymentIntentClientSecret: paymentIntent,
      // setupIntentClientSecret: setupIntent,
      customerEphemeralKeySecret: ephemeralKey,
      customerId: customer,
      merchantDisplayName: 'Esau'
    });

    // Present PaymentFlow. **Not completed yet.**
    const presentResult = await Stripe.presentPaymentFlow();
    console.log('presentResult: ', presentResult); // { cardNumber: "●●●● ●●●● ●●●● ****" }

    // Confirm PaymentFlow. Completed.
    const confirmResult = await Stripe.confirmPaymentFlow();
    console.log('confirmResult: ', confirmResult);
    if (confirmResult.paymentResult === PaymentFlowEventsEnum.Completed) {
      // Happy path
      this.splitAndJoin(paymentIntent);
    }
  }

  async applePay() {
      // Check to be able to use Apple Pay on device
    const isAvailable = Stripe.isApplePayAvailable().catch(() => undefined);
    if (isAvailable === undefined) {
      // disable to use Google Pay
      return;
    }

    // be able to get event of Apple Pay
    Stripe.addListener(ApplePayEventsEnum.Completed, () => {
      console.log('ApplePayEventsEnum.Completed');
    });

    const data$ = this.httpPost(this.data);

    const { paymentIntent } = await lastValueFrom(data$);

    // Prepare Apple Pay
    await Stripe.createApplePay({
      paymentIntentClientSecret: paymentIntent,
      paymentSummaryItems: [{
        label: 'Esau',
        amount: 1099.00
      }],
      merchantIdentifier: 'Esau',
      countryCode: 'MX',
      currency: 'MXN',
    });

    // Present Apple Pay
    const result = await Stripe.presentApplePay();
    if (result.paymentResult === ApplePayEventsEnum.Completed) {
      // Happy path
      this.splitAndJoin(paymentIntent);
    }
  }

  async googlePay() {
    // Check to be able to use Google Pay on device
    const isAvailable = Stripe.isGooglePayAvailable().catch(() => undefined);
    if (isAvailable === undefined) {
      return;
    }
  
    Stripe.addListener(GooglePayEventsEnum.Completed, () => {
      console.log('GooglePayEventsEnum.Completed');
    });
    
    const data$ = this.httpPost(this.data);

    const { paymentIntent } = await lastValueFrom(data$);

    await Stripe.createGooglePay({
      paymentIntentClientSecret: paymentIntent,

      paymentSummaryItems: [{
        label: 'Esau',
        amount: 1099.00
      }],
      merchantIdentifier: 'Esau',
      countryCode: 'MX',
      currency: 'MXN',
    });

    const result = await Stripe.presentGooglePay();
    if (result.paymentResult === GooglePayEventsEnum.Completed) {
      this.splitAndJoin(paymentIntent);
    }
  }

  splitAndJoin(paymentIntent) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');
    console.log(result);
    return result;
  }
}
