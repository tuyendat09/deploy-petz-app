// MyEditor.js
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormikProps } from "formik";

const MyEditor = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <>
      <p>Mô tả: </p>
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: ["heading", "|", "bold", "italic", "undo", "redo"],
        }}
        data={formik.values.productDetailDescription}
        onChange={(event, editor) => {
          const data = editor.getData();
          formik.setFieldValue("productDetailDescription", data);

          const parser = new DOMParser();
          const doc = parser.parseFromString(data, "text/html");
        }}
      />
    </>
  );
};

export default MyEditor;
