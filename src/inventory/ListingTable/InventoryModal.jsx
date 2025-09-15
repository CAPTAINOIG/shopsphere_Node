import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
} from "@nextui-org/react";

const InventoryModal = ({ isOpen, onOpenChange, onClose, viewItem }) => {
  if (!viewItem) return null;

  const {
    title,
    picture_detail,
    brand,
    sku,
    model,
    profit_margin,
    cost,
    price,
    location,
    category,
    upc,
    min_profit_mergin,
    parsedItemSpecific = {},
    description,
  } = viewItem;

  return (
    <div className="flex flex-col gap-2">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
        <ModalContent className="w-[50vw] max-w-5xl">
          <>
            <ModalHeader>Product Details</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div className="flex gap-6">
                  <div className="w-1/3">
                    <Image
                      src={picture_detail}
                      alt={title}
                      isZoomed
                      className="w-full h-80 rounded object-cover"
                    />
                  </div>
                  <div className="w-2/3">
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li><strong>Brand:</strong> {brand || "N/A"}</li>
                      <li><strong>Fragrance Name:</strong> {parsedItemSpecific["Fragrance Name"] || "N/A"}</li>
                      <li><strong>Type:</strong> {parsedItemSpecific.Type || "N/A"}</li>
                      <li><strong>Volume:</strong> {parsedItemSpecific.Volume || "N/A"}</li>
                      <li><strong>Formulation:</strong> {parsedItemSpecific.Formulation || "N/A"}</li>
                      <li><strong>Scent:</strong> {parsedItemSpecific.Scent || "N/A"}</li>
                      <li><strong>SKU:</strong> {sku || "N/A"}</li>
                      <li><strong>Model:</strong> {model || "N/A"}</li>
                      <li><strong>UPC:</strong> {upc || "N/A"}</li>
                      <li><strong>Min Profit Merging:</strong> {min_profit_mergin || "N/A"}</li>
                      <li><strong>Category:</strong> {category || "N/A"}</li>
                      <li><strong>Location:</strong> {location || "N/A"}</li>
                      <li><strong>Price:</strong> ${price || "0.00"}</li>
                      <li><strong>Cost:</strong> ${cost || "0.00"}</li>
                      <li><strong>Profit Margin:</strong> {profit_margin ? `${profit_margin}%` : "N/A"}</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-md font-semibold mb-1">Description:</h3>
                  <div
                    className="prose prose-sm max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="success" className="text-white" onPress={onClose}>
                Continue
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default InventoryModal;
