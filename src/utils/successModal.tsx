import { Button, Popconfirm, message } from "antd";

interface SuccessModalProps {
    titleSuccess: string;
    open: boolean;
    setOpen: (open: boolean) => void; 
}

export const SuccessModal = ({ titleSuccess, open, setOpen }: SuccessModalProps) => {

    const confirm = () => {
        setOpen(false);
        message.success(titleSuccess);
    };

    return (
        <div>
            <Popconfirm
                open={open}
                onConfirm={confirm}
                title="Are you sure you want to delete this task?"
                okText={null}
                cancelText={null}
            >
                <Button>Delete a task</Button>
            </Popconfirm>
        </div>
    );
};
