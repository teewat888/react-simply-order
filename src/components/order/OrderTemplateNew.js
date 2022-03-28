import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productActions } from "../../store/product-slice";
import { createTemplate, templateActions } from "../../store/template-slice";
import { SkeletonLoading } from "../layout/SkeletonLoading";
import { vendorActions } from "../../store/vendor-slice";
import { numbers } from "../../utils/numbers";
import { OrderTemplateForm } from "./OrderTemplateForm";

// This component take care of each product to be enable in each template

export const OrderTemplateFormNew = (props) => {
  const { user_id, vendor_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productList);

  // flag to be set once order just create to redirect once finish created template
  const finishCreate = useSelector((state) => state.template.fetchSuccess);
  const isLoading = useSelector((state) => state.product.isLoading);
  const currentVendor = useSelector((state) => state.vendor.currentVendor);
  const company_name =
    currentVendor.company_name + numbers(1000, 9999).toString(); // gen random nam for template name

  console.log("we are at template now-finishcreate => ", finishCreate);
  const [currentProduct, setCurrentProduct] = useState(products);
  const [templateName, setTemplateName] = useState(company_name); // set default template name
  console.log("current products->", currentProduct);

  useEffect(() => {
    setCurrentProduct([...products]);
  }, [dispatch]);

  useEffect(() => {
    if (finishCreate) {
      navigate("/vendors");
      dispatch(templateActions.resetFetchFlag());
      dispatch(vendorActions.resetCurrentVendor());
    }
  }, [finishCreate]);

  const handleOnChange = (e) => {
    //handle check boxes
    setCurrentProduct(
      currentProduct.map((item) => {
        if (item.id === parseInt(e.target.id)) {
          return { ...item, in_template: e.target.checked };
        } else {
          return item;
        }
      })
    );
  };

  const handleNameChange = (e) => {
    setTemplateName(e.target.value);
  };

  const handleCreateTemplate = (e) => {
    dispatch(createTemplate(templateName, user_id, vendor_id, currentProduct));
  };

  const handleCancelCreate = () => {
    dispatch(productActions.resetFetchFlag());
    dispatch(vendorActions.resetCurrentVendor());
    navigate("/vendors");
  };

  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <>
      <OrderTemplateForm
        currentProduct={currentProduct}
        handleOk={handleCreateTemplate}
        handleCancel={handleCancelCreate}
        mode={"new"}
        templateName={templateName}
        handleNameChange={handleNameChange}
        handleOnChange={handleOnChange}
      />
    </>
  );
};
