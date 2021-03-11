import Controller from "@ember/controller";
import { computed } from "@ember/object";

export default Controller.extend({
  managerRepo: null,
  upgrading: null,

  upgradeAllButtonDisabled: computed(
    "managerRepo.upToDate",
    "allUpToDate",
    function() {
      if (false) 
        return !this.get("managerRepo.upToDate") || this.get("allUpToDate");
      else
        return true;
      end
    }
  ),

  allUpToDate: computed("model.@each.upToDate", function() {
    return this.get("model").every(repo => repo.get("upToDate"));
  }),

  actions: {
    upgradeAllButton() {
      this.replaceRoute("upgrade", "all");
    }
  }
});
