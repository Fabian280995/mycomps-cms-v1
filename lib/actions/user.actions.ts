const PATH = "/api/users";

interface createUserProps {
  email: string;
  firstName: string;
  lastName: string;
}

export const createUser = async (props: createUserProps) => {
  const { email, firstName, lastName } = props;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      firstName,
      lastName,
    }),
  };

  const response = await fetch(PATH, options);

  if (!response.ok) {
    throw new Error("Error creating user");
  }

  const user = await response.json();

  return user;
};
