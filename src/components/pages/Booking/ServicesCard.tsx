import { Services } from "@/types/Services";
import formatMoney from "@/utils/formatMoney";
import { FormikProps } from "formik";

interface ServicesCardProps {
  service: Services;
  formik: FormikProps<any>;
}

export default function ServicesCard({ service, formik }: ServicesCardProps) {
  const isSelected =
    formik.values.selectedServices[service.serviceType]?.serviceId ===
    service._id;

  const handleSelect = async () => {
    if (isSelected) {
      formik.setFieldValue(
        `selectedServices.${service.serviceType}`,
        undefined,
      );
    } else {
      await formik.setFieldValue(`selectedServices.${service.serviceType}`, {
        serviceId: service._id,
        serviceName: service.serviceName,
        servicePrice: service.servicePrice,
        serviceDuration: service.serviceDuration,
      });
    }

    formik.setFieldTouched(`selectedServices.${service.serviceType}`, true);
  };

  return (
    <div
      onBlur={() =>
        formik.setFieldTouched(`selectedServices.${service.serviceType}`, true)
      }
      className={`h-full rounded-button bg-gray-100 px-4 py-2 transition duration-300 ${
        isSelected ? "bg-primary text-white" : ""
      }`}
      onClick={handleSelect}
      style={{ cursor: "pointer" }}
    >
      <div>
        Dịch vụ: <span className="font-bold">{service.serviceName}</span>
      </div>
      <div>Thời gian: {service.serviceDuration}</div>
      <div>Giá dịch vụ: {formatMoney(service.servicePrice)}</div>
    </div>
  );
}
