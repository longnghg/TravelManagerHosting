using System;

namespace Travel.Context.Models
{
    public class Ward
    {

        public Guid IdWard { get; set; }
        public string NameWard { get; set; }
        public Guid IdDistrict { get; set; }
        public District District { get; set; }
    }
}
