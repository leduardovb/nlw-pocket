export const ResponseDTO = {
  make: (statusCode: number, data: unknown) => {
    return {
      statusCode,
      data,
    }
  },
}
