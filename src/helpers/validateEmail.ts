const validateEmail = (email: string) => {
  const regex = /^(?!.*\.\.)(?!.*__)(?!.*\.$)(?!.*\._)(?!.*-\-)(?!.*_-)(?!.*-_)[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(email);
};

export default validateEmail;
