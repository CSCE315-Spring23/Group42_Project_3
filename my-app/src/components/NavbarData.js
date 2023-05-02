/**

Array of menu links for the navigation bar
This array contains the links and corresponding labels for the navigation bar menu.
@type {Object[]}
@property {string} to - Link to the specified page
@property {string} label - Label displayed for the specified link
*/
export const menuLinks = [
  { to: '/Burgers', label: 'Burgers' },
  { to: '/Sandwiches', label: 'Sandwiches' },
  { to: '/Baskets', label: 'Baskets' },
  { to: '/Sides', label: 'Sides & Drinks' },
  { to: '/Seasonal', label: 'Seasonal' },
  ];
  /**
  
  Label for the check out button
  This constant contains the label displayed for the check out button.
  @type {string}
  */
  export const buttonText = 'CHECK OUT';
  /**
  
  Path for the check out button
  This constant contains the path to the check out page for the check out button.
  @type {string}
  */
  export const buttonPath = '/checkout';
  /**
  
  Array of manager links for the navigation bar
  This array contains the links and corresponding labels for the manager navigation bar menu.
  @type {Object[]}
  @property {string} to - Link to the specified page
  @property {string} label - Label displayed for the specified link
  */
  export const managerLinks = [
  { to: '/ManagerView', label: 'View and Edit Database' },
  { to: '/ManagerDatabaseAccess', label: 'Reports' },
  ];
  /**
  
  Array of employee links for the navigation bar
  This array contains the links and corresponding labels for the employee navigation bar menu.
  @type {Object[]}
  @property {string} to - Link to the specified page
  @property {string} label - Label displayed for the specified link
  */
  export const employeeLinks = [
  { to: '/EmployeeView', label: 'Employee Order' },
  ];