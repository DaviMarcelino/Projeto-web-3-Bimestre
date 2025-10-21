import vine from '@vinejs/vine';

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first();
        return !user;
      }),
    password: vine.string().minLength(6).maxLength(32),
    cpf: vine
      .string()
      .regex(/^\d{11}$/)
      .unique(async (db, value) => {
        const user = await db.from('users').where('cpf', value).first();
        return !user;
      }),
    cidade: vine.string().trim().minLength(2).maxLength(100),
    estado: vine.string().trim().fixedLength(2),
    rua: vine.string().trim().minLength(2).maxLength(200),
    numero: vine.string().trim().minLength(1).maxLength(10),
    papel_id: vine.number().positive().withoutDecimals().optional(),
  })
);

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(6).maxLength(32), // Adicionando restrição de comprimento
  })
);
