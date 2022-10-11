using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelApi.Hubs
{
    public interface ITravelHub
    {
        Task SendOffersToUser(List<string> message);
        Task Insert();

    }
}
