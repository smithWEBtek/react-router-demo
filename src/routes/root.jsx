import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  redirect,
  NavLink,
  useNavigation,
} from "react-router-dom";
import {getContacts, createContact, deleteContact} from "../contacts";

// export async function action() {
//   const contact = await deleteContact();
//   // return {contact};
//   return redirect(`/contacts`);
// }

export async function action() {
  const contact = await createContact();
  // return {contact};
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader() {
  const contacts = await getContacts();
  console.log("[root][loader] contacts: ", contacts);
  return {contacts};
}

export default function Root() {
  const {contacts} = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({isActive, isPending}) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    <Link to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </Link>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <>
        <div
          id="detail"
          className={navigation.state === "loading" ? "loading" : ""}
          // style={{
          //   border: "4px dashed green",
          //   borderRadius: "4px",
          //   margin: "16px",
          // }}
        >
          <div>
            <i
              style={{
                display: "inline-block",
                color: "green",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              - - - the &lt;Outlet /&gt; component in root.jsx - - -
            </i>
          </div>
          <Outlet />
        </div>
      </>
    </>
  );
}
