export const errorMessages = Object.freeze({
    required: (name: string) => `لطفا ${name} را وارد کنید`,
    minLength: (name: string, min: number) => `${name} نمی‌تواند کمتر از ${min} کاراکتر داشته باشد`,
})