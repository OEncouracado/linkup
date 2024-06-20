import React, { useEffect } from 'react';

const StripePricingTable = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://js.stripe.com/v3/pricing-table.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <div className="container text-center my-5">
            <h2>Escolha seu Plano</h2>
            <stripe-pricing-table
                pricing-table-id="prctbl_1PTn44A9fsZlnNewDSq19yZe"
                publishable-key="pk_test_51PTmX3A9fsZlnNew1NJwdkxeHmb55q2KU8AXWoyphDF4NtiEbS0wLXJ1cFEg485IFXsTr0AKcR0xXzlGKbUZUmaa00b7p0Vqzq">
            </stripe-pricing-table>
        </div>
    );
}

export default StripePricingTable;
