"use client";

import { Tab, Tabs } from "@nextui-org/react";
import ChangeVoucherFilter from "./ChangeVoucherTable/ChangeVoucherFilter";
import ChangeVoucherTable from "./ChangeVoucherTable/ChangeVoucherTable";
import { VoucherProvider } from "./store/ChangeVoucherContext";
import { HeldVoucherProvider } from "./store/HeldVoucherContext";
import HeldVoucherFilter from "./HeldVoucherTable/HeldVoucherFilter";
import HeldVoucherTable from "./HeldVoucherTable/HeldVoucherTable";

export default function ChangeVoucher() {
  return (
    <Tabs>
      <Tab title="Đổi voucher">
        <VoucherProvider initialPage={1}>
          <ChangeVoucherFilter />
          <ChangeVoucherTable />
        </VoucherProvider>
      </Tab>
      <Tab title="Voucher của tôi">
        <HeldVoucherProvider initialPage={1}>
          <HeldVoucherFilter />
          <HeldVoucherTable />
        </HeldVoucherProvider>
      </Tab>
    </Tabs>
  );
}
