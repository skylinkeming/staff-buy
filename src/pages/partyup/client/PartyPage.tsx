import MobileCheckoutBar from "@/components/partyup/client/MobileCheckoutBar";
import CartSummary from "@/components/partyup/client/CartSummary";
import ProductInfo from "@/components/partyup/client/partyPage/ProductInfo";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Grid } from "antd";
import { usePartyupApi } from "@/api/partyup/usePartyupApi";

const { useBreakpoint } = Grid;

export default function PartyPage() {
    const navigate = useNavigate();
    const screens = useBreakpoint();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const { data } = usePartyupApi.usePartyDetailQuery(id!);

    console.log({ data });
    return (
        <div className="flex gap-7.5 justify-center">

            <div className="flex gap-7.5 jusitfy-center">
                {data && <ProductInfo data={data} />}
            </div>
            <div className="hidden md:inline-block sticky top-16 h-100  mt-20">
                <CartSummary />
            </div>
            {!screens.md && <MobileCheckoutBar onClickBtn={() => navigate("/partyup/checkout")} />}

        </div>
    )
}