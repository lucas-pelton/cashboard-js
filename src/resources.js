/**
 * Single source of truth for the resources documented by the Cashboard API.
 * https://api.cashboardapp.com/
 */
export const RESOURCES = {
  account: { path: 'account', createPath: 'accounts', singular: 'account', description: 'The authenticated employee account.', example: 'await cb.account.get()' },
  clientContacts: { path: 'client_contacts', singular: 'client_contact', description: 'People who can be assigned Cashboard resources.', example: 'await cb.clientContacts.list()' },
  clientCompanies: { path: 'client_companies', singular: 'client_company', description: 'Organizations grouping client contacts.', example: 'await cb.clientCompanies.list()' },
  comments: { path: 'comments', singular: 'comment', description: 'Comments attached to accessible resources.', example: 'await cb.comments.list()' },
  documentTemplates: { path: 'document_templates', singular: 'document_template', description: 'Templates for invoices, payments, and estimates.', example: 'await cb.documentTemplates.list()' },
  employees: { path: 'employees', singular: 'employee', actions: { projectAssignments: ['GET', 'project_assignments'], managerMemberships: ['GET', 'manager_memberships'] }, description: 'Employees in the account.', example: 'await cb.employees.list()' },
  estimates: { path: 'estimates', singular: 'estimate', actions: { toggleStatus: ['PUT', 'toggle_status'], lineItems: ['GET', 'line_items'], lineItemTasks: ['GET', 'line_item_tasks'], lineItemProducts: ['GET', 'line_item_products'], lineItemCustoms: ['GET', 'line_item_customs'] }, description: 'Estimates sent to clients.', example: 'await cb.estimates.list()' },
  expenses: { path: 'expenses', singular: 'expense', description: 'Expenses recorded for projects.', example: 'await cb.expenses.list()' },
  invoiceLineItems: { path: 'invoice_line_items', singular: 'invoice_line_item', description: 'Line items belonging to invoices.', example: 'await cb.invoiceLineItems.list()' },
  invoicePayments: { path: 'invoice_payments', singular: 'invoice_payment', description: 'Payments applied to invoices.', example: 'await cb.invoicePayments.list()' },
  invoices: { path: 'invoices', singular: 'invoice', actions: { importUninvoicedItems: ['PUT', 'import_uninvoiced_items'], lineItems: ['GET', 'line_items'] }, description: 'Invoices sent to clients.', example: 'await cb.invoices.list()' },
  lineItems: { path: 'line_items', singular: 'line_item', description: 'Project and estimate line items.', example: 'await cb.lineItems.list()' },
  payments: { path: 'payments', singular: 'payment', actions: { invoices: ['GET', 'invoices'] }, description: 'Payments received from clients.', example: 'await cb.payments.list()' },
  projectAssignments: { path: 'project_assignments', singular: 'project_assignment', description: 'Employee assignments to projects.', example: 'await cb.projectAssignments.list()' },
  projects: { path: 'projects', singular: 'project', actions: { toggleStatus: ['PUT', 'toggle_status'], lists: ['GET', 'lists'], lineItems: ['GET', 'line_items'], assignedEmployees: ['GET', 'assigned_employees'], assignedEmployeesAll: ['PUT', 'assigned_employees_all'] }, description: 'Projects containing tasks, time entries, and expenses.', example: 'await cb.projects.list()' },
  projectLists: { path: 'project_lists', singular: 'project_list', actions: { order: ['PUT', 'order'], toggleStatus: ['PUT', 'toggle_status'] }, description: 'Lists and items within projects.', example: 'await cb.projectLists.list()' },
  timeEntries: { path: 'time_entries', singular: 'time_entry', actions: { toggleTimer: ['PUT', 'toggle_timer'] }, description: 'Time recorded against projects.', example: 'await cb.timeEntries.list()' },
};

export const METHODS = {
  list: { http: 'GET /{path}', args: '(query?: object)', returns: 'array of records', doc: 'List records. `query` becomes URL query params.' },
  get: { http: 'GET /{path}/{id}', args: '(id)', returns: 'record', doc: 'Fetch one record by id.' },
  create: { http: 'POST /{path}', args: '(data: object)', returns: 'created record', doc: 'Create a record. Data is wrapped in the resource singular name unless already wrapped.' },
  update: { http: 'PUT /{path}/{id}', args: '(id, data: object)', returns: 'updated record', doc: 'Update a record. Data is wrapped in the resource singular name unless already wrapped.' },
  delete: { http: 'DELETE /{path}/{id}', args: '(id)', returns: 'null or API response', doc: 'Delete a record by id.' },
};

export const ALIASES = {
  clients: 'clientCompanies',
  people: 'clientContacts',
};
