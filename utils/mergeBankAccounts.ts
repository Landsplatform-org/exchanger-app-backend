export function mergeBankAccounts(data: any) {
  let accounts: string[] = [];

  for (const item of data) {
    accounts.push(item.account);
  }

  const result = { ...data[0], account: accounts };

  return result;
}
