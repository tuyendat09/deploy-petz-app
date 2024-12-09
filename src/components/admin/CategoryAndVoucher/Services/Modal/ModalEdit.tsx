import {
  useGetServicesQuery,
  useEditServiceMutation,
} from "@/libs/features/services/services";
import { ServicesType } from "@/types/Services";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface ModalEditProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  editServiceId: string;
}

const SERVICES_TYPE = ["NAIL_CARE", "CLEAN", "HAIR", "MASSAGE", "COMBO"];

export default function ModalEdit({
  isDialogOpen,
  handleCloseDialog,
  editServiceId,
}: ModalEditProps) {
  const [serviceName, setServiceName] = useState<string>("");
  const [servicePrice, setServicePrice] = useState<string>("");
  const [serviceDuration, setServiceDuration] = useState<string>("");
  const [serviceType, setServiceType] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [priceErrorMessage, setPriceErrorMessage] = useState<string>("");
  const [durationErrorMessage, setDurationErrorMessage] = useState<string>("");
  const [typeErrorMessage, setTypeErrorMessage] = useState<string>("");
  const [duplicatedMessage, setDuplicatedMessage] = useState<string>("");

  const {
    data: serviceData,
    isLoading,
    isError,
  } = useGetServicesQuery({ serviceId: editServiceId });

  const [editService, { data, error: mutationError }] =
    useEditServiceMutation();

  useEffect(() => {
    if (serviceData) {
      // Initialize form fields with existing service data
      setServiceName(serviceData[0].serviceName);
      setServicePrice(serviceData[0].servicePrice.toLocaleString("de-DE"));
      setServiceDuration(serviceData[0].serviceDuration.toString());
      setServiceType(serviceData[0].serviceType);
    }
  }, [serviceData]);

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/\./g, "").replace(/\D/g, "");
    if (!numericValue) return "";

    return parseInt(numericValue, 10).toLocaleString("de-DE");
  };

  const handleServicePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPrice(e.target.value);
    setServicePrice(formattedValue);
    setPriceErrorMessage("");
  };

  const handleServiceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServiceName(e.target.value);
    setErrorMessage("");
  };

  const handleServiceDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    setServiceDuration(value);
    setDurationErrorMessage("");
  };

  const handleSave = () => {
    let valid = true;

    if (!serviceName.trim()) {
      setErrorMessage("Tên dịch vụ không được để trống");
      valid = false;
    }

    if (!servicePrice.trim()) {
      setPriceErrorMessage("Giá dịch vụ không được để trống");
      valid = false;
    } else {
      // Remove dots and convert to number
      const priceValue = parseInt(servicePrice.replace(/\./g, ""), 10);
      if (isNaN(priceValue) || priceValue < 0) {
        setPriceErrorMessage("Giá dịch vụ không được là số âm");
        valid = false;
      }
    }

    if (!serviceDuration.trim()) {
      setDurationErrorMessage("Thời gian dịch vụ không được để trống");
      valid = false;
    } else {
      const durationValue = parseInt(serviceDuration, 10);
      if (isNaN(durationValue) || durationValue < 0) {
        setDurationErrorMessage("Thời gian dịch vụ không được là số âm");
        valid = false;
      }
    }

    if (!serviceType) {
      setTypeErrorMessage("Loại dịch vụ không được để trống");
      valid = false;
    }

    if (valid) {
      const payload = {
        serviceId: editServiceId,
        serviceName: serviceName.trim(),
        servicePrice: parseInt(servicePrice.replace(/\./g, ""), 10),
        serviceDuration: parseInt(serviceDuration, 10),
        serviceType,
      };

      editService(payload);
    }
  };

  useEffect(() => {
    if (mutationError) {
      setDuplicatedMessage((mutationError as any).data?.message);
    }
    if (data) {
      handleCloseDialog();
    }
  }, [mutationError, data, handleCloseDialog]);

  if (isLoading) {
    return (
      <Modal
        backdrop="blur"
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          <ModalBody>
            <div className="flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal
        backdrop="blur"
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          <ModalBody>
            <p className="text-center text-red-500">
              Lỗi khi tải dữ liệu dịch vụ.
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal
      backdrop="blur"
      isOpen={isDialogOpen}
      onClose={handleCloseDialog}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-center dark:text-white">
              Chỉnh sửa dịch vụ
            </ModalHeader>
            <ModalBody>
              <p className="text-base text-red-500">{duplicatedMessage}</p>
              <Select
                labelPlacement={"inside"}
                label="Loại dịch vụ"
                className="w-full"
                errorMessage={typeErrorMessage}
                isInvalid={typeErrorMessage !== ""}
                selectedKeys={[serviceType]}
                onSelectionChange={(key) => {
                  setServiceType((key as any).currentKey);
                  setTypeErrorMessage("");
                }}
              >
                {SERVICES_TYPE.map((type) => (
                  <SelectItem
                    className="dark:text-white"
                    key={type}
                    value={type}
                  >
                    {ServicesType[type as keyof typeof ServicesType]}
                  </SelectItem>
                ))}
              </Select>
              <Input
                type="text"
                label="Nhập tên dịch vụ"
                value={serviceName}
                onChange={handleServiceNameChange}
                errorMessage={errorMessage}
                isInvalid={errorMessage !== ""}
              />
              <Input
                type="text"
                label="Nhập giá dịch vụ"
                value={servicePrice}
                onChange={handleServicePriceChange}
                errorMessage={priceErrorMessage}
                isInvalid={priceErrorMessage !== ""}
              />
              <Input
                type="number"
                label="Nhập thời gian dịch vụ (phút)"
                value={serviceDuration}
                onChange={handleServiceDurationChange}
                errorMessage={durationErrorMessage}
                isInvalid={durationErrorMessage !== ""}
                min={0}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={handleCloseDialog}
                className="rounded-full"
              >
                Hủy
              </Button>
              <Button
                color="success"
                className="rounded-full text-white"
                onPress={handleSave}
              >
                Lưu
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
