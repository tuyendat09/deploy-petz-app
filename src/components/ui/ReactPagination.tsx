import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { PaginationItem } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

interface ReactPaginationProps {
    totalPages: number;
    handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
    className?: string; 
    pageNumber: number;
}

const ReactPagination: React.FC<ReactPaginationProps> = ({ totalPages, handlePageChange, className, pageNumber }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }} mb={2}>
            <Stack spacing={2}>
                <Pagination
                    size="large"
                    count={totalPages}
                    onChange={handlePageChange}
                    showFirstButton
                    page={pageNumber}
                    renderItem={(item) => (
                        <PaginationItem
                            {...item}
                            components={{
                                last: KeyboardDoubleArrowRightIcon,
                                first: KeyboardDoubleArrowLeftIcon,
                            }}
                        />
                    )}
                    showLastButton
                    shape="rounded"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: '#232D3A',
                            backgroundColor: 'white',
                        },
                        '& .Mui-selected': {
                            backgroundColor: '#a8a87b !important',
                            color: 'white',
                        },
                        '& .MuiPaginationItem-icon': {
                            width: '18px',
                            height: '18px',
                        },
                    }}
                    className={className}
                />
            </Stack>
        </Box>
    );
};

export default ReactPagination;
