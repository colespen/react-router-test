import {
  Outlet,
  Link,
  useLoaderData,
  Form,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

//// action set in main.jsx loader: rootLoader
export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

//// action set in main.jsx action: rootAction
export async function action() {
  const contact = await createContact();
  return { contact };
}


export default function Root() {

  const { contacts } = useLoaderData();

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
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
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
                  {/* Client side routing allows our app to update the URL 
                  without requesting another document from the server 
                  - use Link (like Next.js) */}
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
      <div id="detail">
        {/* tell Root route where to render child routes */}
        <Outlet />
      </div>
    </>
  );
}