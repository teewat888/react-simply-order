import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { OrderTemplateForm } from "./OrderTemplateForm";
import { editTemplate } from "../../store/template-slice";
import { SkeletonLoading } from "../layout/SkeletonLoading";

// This component take care of each product to be enable in each template

export const OrderTemplateFormEdit = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.template.templateDetails.products
  );

  // flag to be set once order just create to redirect once finish created template
  const finishEdit = useSelector((state) => state.template.editMode);
  const isLoading = useSelector((state) => state.template.isLoading);

  const company_name = useSelector(
    (state) => state.template.templateDetails.name
  );


  const [currentProduct, setCurrentProduct] = useState(products);
  const [templateName, setTemplateName] = useState(company_name); // set default template name

  // if template_id pass-> edit mode
  const { user_id, template_id } = useParams();

  useEffect(() => {
    setCurrentProduct([...products]);
    setTemplateName(company_name);
  }, [products, company_name]);

  useEffect(() => {
    if (finishEdit) {
      navigate(`/user/${user_id}/order_templates/mytemplates`);
    }
  }, [finishEdit]);

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

  const handleEditTemplate = (e) => {
    dispatch(editTemplate(user_id, template_id, templateName, currentProduct));
  };

  const handleCancelEdit = () => {
    navigate(`/user/${user_id}/order_templates/mytemplates`);
  };

  if (currentProduct === undefined) {
    return null;
  }

  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <>
      <OrderTemplateForm
        currentProduct={currentProduct}
        handleOk={handleEditTemplate}
        handleCancel={handleCancelEdit}
        mode={"edit"}
        templateName={templateName}
        handleNameChange={handleNameChange}
        handleOnChange={handleOnChange}
      />
    </>
  );
};
