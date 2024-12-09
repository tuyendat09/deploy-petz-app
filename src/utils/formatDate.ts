const formatDate = (dateString: any) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }
};

export default formatDate;
