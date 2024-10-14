export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function entityExists(entity: any, id: string) {
  const isExist = await entity.findFirst({
    where: { id: id },
  });
  if (isExist) {
    return isExist;
  }
  return false;
}

export async function checkIfAnyEntityExists(res: any[]) {
  const results = await Promise.all([...res]);

  return results.some((result) => result !== false);
}
