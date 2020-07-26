const removeAccents = value => {
    return value
        .split('')
        .map(function (char) {
            const i = this.accents.indexOf(char)
            return (i !== -1) ? this.accentsOut[i] : char
        }.bind({
            accents: 'ÀÁÂÃÄÅĄĀāàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏĪìíîïīÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚŞšśşŤťŸÝÿýŽŻŹžżźđĢĞģğ',
            accentsOut: 'AAAAAAAAaaaaaaaasOOOOOOOOoooooooDdDZdzEEEEEeeeeeeCcCcCcDIIIIIiiiiiUUUUUuuuuuLLLlllNNNnnnRrSSSsssTtYYyyZZZzzzdGGgg'
        })).join('')
}

module.exports = {
    normalize: v => removeAccents((v || '').trim().toLowerCase())
}
