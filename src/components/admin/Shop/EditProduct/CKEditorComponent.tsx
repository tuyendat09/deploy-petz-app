// MyEditor.tsx
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormikProps } from "formik";

interface MyEditorProps {
  formik: FormikProps<any>;
}

const MyEditor: React.FC<MyEditorProps> = ({ formik }) => {
  return (
    <div>
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
        }}
      />
    </div>
  );
};

export default MyEditor;
